typedef long BKSOpenApplicationErrorCode;
enum {
    BKSOpenApplicationErrorCodeNone = 0,
};

extern NSString *BKSActivateForEventOptionTypeBackgroundContentFetching;
extern NSString *BKSDebugOptionKeyArguments;
extern NSString *BKSDebugOptionKeyEnvironment;
extern NSString *BKSDebugOptionKeyStandardOutPath;
extern NSString *BKSDebugOptionKeyStandardErrorPath;
extern NSString *BKSDebugOptionKeyWaitForDebugger;
extern NSString *BKSDebugOptionKeyDisableASLR;
extern NSString *BKSOpenApplicationOptionKeyDebuggingOptions;
extern NSString *BKSOpenApplicationOptionKeyUnlockDevice;
extern NSString *BKSOpenApplicationOptionKeyActivateForEvent;
extern NSString *BKSDebugOptionKeyDebugOnNextLaunch;
extern NSString *BKSDebugOptionKeyCancelDebugOnNextLaunch;

@interface BKSSystemService : NSObject {
    // FBSSystemService* _fbsSystemService;
}
-(void)cleanupClientPort:(unsigned)arg1 ;
-(void)openApplication:(id)arg1 options:(id)arg2 clientPort:(unsigned)arg3 withResult:(/*^block*/id)arg4 ;
-(void)terminateApplication:(id)arg1 forReason:(int)arg2 andReport:(BOOL)arg3 withDescription:(id)arg4 ;
-(void)terminateApplicationGroup:(int)arg1 forReason:(int)arg2 andReport:(BOOL)arg3 withDescription:(id)arg4 ;
-(id)init;
-(void)dealloc;
-(void)openApplication:(id)arg1 options:(id)arg2 withResult:(/*^block*/id)arg3 ;
-(id)systemApplicationBundleIdentifier;
-(int)pidForApplication:(id)arg1 ;
-(unsigned)createClientPort;
-(void)openURL:(id)arg1 application:(id)arg2 options:(id)arg3 clientPort:(unsigned)arg4 withResult:(/*^block*/id)arg5 ;
-(BOOL)canOpenApplication:(id)arg1 reason:(int*)arg2;
@end
