package com.testapp;

import android.content.Intent;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data){
        super.onActivityResult(requestCode, resultCode, data);
        // if (requestCode == OVERLAY_PERMISSION_REQ_CODE) {
        //     checkPerms();
        // }
        MainApplication.getmCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
