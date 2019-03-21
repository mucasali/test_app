package com.testapp;

import android.content.Intent;

import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.facebook.react.ReactPackage;
import com.reactnativenavigation.controllers.ActivityCallbacks;

import java.util.Arrays;
import java.util.List;

import co.apptailor.googlesignin.RNGoogleSigninPackage;

public class MainApplication extends NavigationApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getmCallbackManager() {
    return mCallbackManager;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    setActivityCallbacks(new ActivityCallbacks(){
        @Override
        public void onActivityResult(int requestCode, int resultCode, Intent data) {
            mCallbackManager.onActivityResult(requestCode, resultCode, data);
        }
    });
    FacebookSdk.sdkInitialize(getApplicationContext());
  }

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
            new VectorIconsPackage(),
            new RNGoogleSigninPackage(),
            new FBSDKPackage(mCallbackManager),
            new MapsPackage()
    );
  }

  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }

}
