buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle:7.0.4")
        classpath("com.google.gms:google-services:4.3.10") // Firebase plugin
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}
