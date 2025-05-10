from flask import Flask,request,render_template
from flask_socketio import SocketIO, emit, disconnect
from datetime import datetime,timezone
import time


#-----------variable--------------------------
app = Flask(__name__)
active_users = {}  #  {socket_id: {"username": str, "last_active": float, "typing": bool}}

INACTIVITY_TIMEOUT = 300  # 3 minutes (auto-disconnect)
WARNING_TIME = 60  # Warn 1 minute before disconnect

socketio = SocketIO(app, cors_allowed_origins="*") 

def check_inactive_users():
    """Disconnect inactive users after timeout + send warnings."""
    current_time = time.time()
    for socket_id, user_data in list(active_users.items()):
        inactive_for = current_time - user_data["last_active"]
        
        #  warning at 1 minute left
        if INACTIVITY_TIMEOUT - inactive_for <= WARNING_TIME and not user_data.get("warned"):
            emit('inactive_warning', {
                "message": f"You’ll be disconnected in {WARNING_TIME} seconds due to inactivity."
            }, room=socket_id)
            active_users[socket_id]["warned"] = True
        
        # disconnect if timeout reached
        if inactive_for > INACTIVITY_TIMEOUT:
            emit('inactive_disconnect', {
                "message": "You were disconnected due to inactivity."
            }, room=socket_id)
            disconnect(socket_id)
            del active_users[socket_id]

#  checks every 30 seconds
def schedule_inactivity_check():
    while True:
        socketio.sleep(30)
        check_inactive_users()

@socketio.on('connect', namespace='/chat')
def handle_connect():
    socketio.start_background_task(schedule_inactivity_check)
#--join chat

@socketio.on('join_chat', namespace='/chat')
def handle_join(data):
    username = data.get("username", "Anonymous")
    active_users[request.sid] = {
        "username": username,
        "last_active": time.time(),
        "typing": False,
        "warned": False
    }
    emit('user_joined', {"username": username}, broadcast=True)
   
   
#send msg
@socketio.on('new_message', namespace='/chat')
def handle_message(data):
    if request.sid in active_users:
        active_users[request.sid].update({
            "last_active": time.time(),
            "typing": False,
            "warned": False
        })
    #this one will return to client side
    emit('new_message', {
        "sender": data["sender"],
        "message": data["message"],
        "timestamp": datetime.now(timezone.utc).isoformat()
    }, broadcast=True)


# end chat
@socketio.on('end_chat', namespace='/chat')
def handle_end_chat():
    if request.sid in active_users:
        username = active_users[request.sid]["username"]
        emit('chat_ended', {
            "username": username,
            "message": f"{username} left the chat."
        }, broadcast=True)
        disconnect(request.sid)


@app.route('/chat')
def sessions():
    return render_template('index.html')      

        
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5001, debug=True)