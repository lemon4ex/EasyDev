/*
 * iOS Frida TLS pinning bypass
 * 
 * (c) 2017 INTEGRITY S.A.
 * By: Herman Duarte <hd@integrity.pt>
 */

'use strict';

var kSSLSessionOptionBreakOnServerAuth = 0;
var errSecSuccess = 0;
var noErr = 0;
var errSSLServerAuthCompleted = -9841;


function disablePinning()
{
    console.log('Disabling Pinning');
    internalDisablePinningIOS10();
    internalDisablePinningIOS9();
    console.log('... done');
}

function enablePinning()
{
    var tls_helper_create_peer_trust = Module.findExportByName('libcoretls_cfhelpers.dylib', 'tls_helper_create_peer_trust');
    if (tls_helper_create_peer_trust != null)
    {
        console.log('tls_helper_create_peer_trust PTR: ' + tls_helper_create_peer_trust);
        Interceptor.revert(tls_helper_create_peer_trust);
        console.log('tls_helper_create_peer_trust restored');
    }

    var SSLSetSessionOption = Module.findExportByName('Security', 'SSLSetSessionOption');
    if (SSLSetSessionOption != null)
    {
        console.log('SSLSetSessionOption PTR: ' + SSLSetSessionOption);
        Interceptor.revert(SSLSetSessionOption);
        console.log('SSLSetSessionOption restored');
    }

    var SSLCreateContext = Module.findExportByName('Security', 'SSLCreateContext');
    if (SSLCreateContext != null)
    {
        console.log('SSLCreateContext PTR: ' + SSLCreateContext);
        Interceptor.revert(SSLCreateContext);
        console.log('SSLCreateContext restored');
    }

    var SSLHandshake = Module.findExportByName('Security', 'SSLHandshake');
    if (SSLHandshake != null)
    {
        console.log('SSLHandshake PTR: ' + SSLHandshake);
        Interceptor.revert(SSLHandshake);
        console.log('SSLHandshake restored');
    }

}


function internalDisablePinningIOS10()
{
    // Frida hooks for iOS 10
    
    // OSStatus tls_helper_create_peer_trust(tls_handshake_t hdsk, bool server, SecTrustRef *trustRef);
    var tls_helper_create_peer_trust = Module.findExportByName('libcoretls_cfhelpers.dylib', 'tls_helper_create_peer_trust');
    
    //console.log('tls_helper_create_peer_trust PTR: ' + tls_helper_create_peer_trust);

    if (tls_helper_create_peer_trust != null)
    {
        console.log('Found  tls_helper_create_peer_trust');
        Interceptor.replace(tls_helper_create_peer_trust, new NativeCallback(function (hdsk, server, trustRef)
        {
            return errSecSuccess;
        }, 'pointer', ['pointer', 'int', 'pointer']));
    }
}

function internalDisablePinningIOS9()
{
    // Frida hooks for iOS 9 and below

    // https://developer.apple.com/reference/security/1399173-sslsetsessionoption?language=objc
    // OSStatus SSLSetSessionOption(SSLContextRef context, SSLSessionOption option, Boolean value)
    var SSLSetSessionOptionPtr = Module.findExportByName('Security', 'SSLSetSessionOption');
    var SSLSetSessionOption = new NativeFunction(SSLSetSessionOptionPtr, 'pointer', ['pointer', 'int', 'int']);
    
    if (SSLSetSessionOptionPtr != null)
    {
        console.log('Found SSLSetSessionOption');
        Interceptor.replace(SSLSetSessionOptionPtr, new NativeCallback(function (context, option, value)
        {
            console.log('Inside SSLSetSessionOption');
            if (option == kSSLSessionOptionBreakOnServerAuth)
            {
                console.log('option == kSSLSessionOptionBreakOnServerAuth');
                return noErr;
            }
            return SSLSetSessionOption(context, option, value);
        }, 'pointer', ['pointer', 'int', 'int']));
    }
    
    // https://developer.apple.com/reference/security/1393063-sslcreatecontext?language=objc
    // SSLContextRef SSLCreateContext(CFAllocatorRef alloc, SSLProtocolSide protocolSide, SSLConnectionType connectionType)
    var SSLCreateContextPtr = Module.findExportByName('Security', 'SSLCreateContext');
    var SSLCreateContext = new NativeFunction(SSLCreateContextPtr, 'pointer', ['pointer', 'int', 'int']);
    
    if (SSLCreateContextPtr != null)
    {
        console.log('Found SSLCreateContext');
        Interceptor.replace(SSLCreateContextPtr, new NativeCallback(function (alloc, protocolSide, connectionType)
        {
            console.log('Inside SSLCreateContext');
            var sslContext = SSLCreateContext(alloc, protocolSide, connectionType);
            // Immediately set the kSSLSessionOptionBreakOnServerAuth option in order to disable cert validation
            SSLSetSessionOption(sslContext, kSSLSessionOptionBreakOnServerAuth, 1);
            return sslContext;
    
        }, 'pointer', ['pointer', 'int', 'int']));
    }
    
    // https://developer.apple.com/reference/security/1400161-sslhandshake?language=objc
    // OSStatus SSLHandshake(SSLContextRef context)
    var SSLHandshakePtr = Module.findExportByName('Security', 'SSLHandshake');
    var SSLHandshake = new NativeFunction(SSLHandshakePtr, 'int', ['pointer']);
    
    if (SSLHandshakePtr != null)
    {
        console.log('Found SSLHandshake');
        Interceptor.replace(SSLHandshakePtr, new NativeCallback(function (context)
        {
            console.log('Inside SSLHandshake');
            var result = SSLHandshake(context);
            // Hijack the flow when breaking on server authentication
            if (result == errSSLServerAuthCompleted)
            {
                console.log('result == errSSLServerAuthCompleted');
                // Do not check the cert and call SSLHandshake() again
                return SSLHandshake(context);
            }
            return result;
        }, 'int', ['pointer']));
    }
}
