export RC_ProjectSourceVersion=1.0.0.0.0
CC=gcc
FILES=sha256.c sha1.c companion.c  jtool.c decorate.c disass.c disass_common.c machlib.c common.c  thumb16.c arm32.c arm64.c jtoolsyms.c codesign.c objc.c jtoolFuncs.c bmhmemmem.c jSecurity.c

all: arm osx
	lipo -create -arch arm arm/jtool  -arch x86_64 x86_64/jtool -output jtool
	lipo -create -arch arm arm/libJTool.dylib -arch x86_64 x86_64/libJTool.dylib -output libJTool.dylib
	# Update version
	@./incrementVersion
 


debug:
	$(CC)  -mmacosx-version-min=10.6 -Wall $(FILES) -o jtool -g2

static:
	$(CC)  -DX86_64 -DMACHLIB  -mmacosx-version-min=10.8  $(FILES) -o jtool.x64 -g2 -lcurses -framework Security -framework CoreFoundation
	cp jtool.x64 jtool
	#jtool --sign jtool
	#mv out.bin jtool

static108:
	$(CC)    sha1.c  jtool.c decorate.c disass.c machlib.c common.c  companion.c arm32.c thumb16.c arm64.c -o jtool.x64.108
arm64:
	gcc-iphone5s -DARM  jtool.c decorate.c machlib.c disass.c sha1.c common.c companion.c thumb16.c arm32.c arm64.c -o jtool.armv8
	#ldid -Sent.xml jtool.armv8

armstatic64:
	gcc-arm64 -DMACHLIB -DARM  $(FILES) -o jtool.arm64 -g2
	jtool --sign jtool.arm64
	mv out.bin jtool.arm64
armstatic64signed:
	gcc-arm64 -DMACHLIB -DARM  $(FILES) -o jtool.arm64 -g2
	jtool --sign --ent platform.ent jtool.arm64
	mv out.bin jtool.arm64

armv7k:
	gcc-armv7k -DMACHLIB -DARM  $(FILES) -o jtool.armv7k
	jtool --sign jtool.armv7k
	mv out.bin jtool.armv7k

armstatic32:
	gcc-armv7  -DMACHLIB -DARM  $(FILES) -o jtool.arm32
	jtool --sign jtool.arm32
	mv out.bin jtool.arm32

universal: static armstatic64 
	lipo -create  -arch arm64v8 jtool.arm64 -arch x86_64 jtool.x64   -output jtool

osx:
	$(CC) disass.c sha1.c machlib.c common.c pelib.c thumb16.c arm32.c arm64.c -shared -dynamic -o libJTool.dylib -g2
	cp libJTool.dylib x86_64/libJTool.dylib 
	@echo SO FAR SO GOOD
	$(CC) -mmacosx-version-min=10.8   jtool.c decorate.c -L . -o x86_64/jtool -g2  -l jtool

arm:
	gcc-iphone armv7 -DARM machlib.c common.c pelib.c arm64.c -shared -dynamic -o libJTool.dylib
	cp ./libJTool.dylib arm/libJTool.dylib 
	gcc-iphone armv7 -DARM   jtool.c decorate.c -l JTool -L . -o arm/jtool -g2

linux64:
	$(CC)  -DLINUX -DMACHLIB -D__DARWIN_UNIX03 -I./include -DLINUX  $(FILES) -o jtool.ELF64 -g2

linux32:
	$(CC) -m32 -DLINUX32 -DLINUX -DMACHLIB -D__DARWIN_UNIX03 -I./include -DLINUX  $(FILES) -o jtool.ELF32 -g2



disarm.x86: disarmclean
	$(CC) -Wall disarm.c thumb16.c arm32.c arm64.c disass_common.c -DWANT_MAIN -o disarm.x86 -g2

disarm.and:
	./androidcc  -DWANT_MAIN -o disarm.android

disarm.arm64: disarmclean
	gcc-arm64 -Wall disarm.c thumb16.c arm32.c arm64.c disass_common.c -DWANT_MAIN -o disarm.arm64
	jtool --sign --inplace disarm.arm64

disarm.armv7: disarmclean
	gcc-armv7 -Wall disarm.c thumb16.c arm32.c arm64.c disass_common.c -DWANT_MAIN -o disarm.armv7
	jtool --sign --inplace disarm.armv7

disarmelf:
	$(CC) -Wall disarm.c thumb16.c arm32.c arm64.c disass_common.c -DWANT_MAIN -o disarm.ELF64 -DLINUX

disarmelf32:
	$(CC) -m32 -Wall disarm.c thumb16.c arm32.c arm64.c disass_common.c -DWANT_MAIN -o disarm.ELF32 -DLINUX 

disarm: disarm.x86 disarm.arm64 disarm.armv7
	lipo -create -output disarm -arch x86_64 disarm.x86 -arch arm64 disarm.arm64 -arch armv7 disarm.armv7

disarmclean:
	
disarmdist:
	tar cvf disarm.tar disarm disarm.ELF32 disarm.ELF64 disarm.android32
clean:
	rm -fR libJTool.dylib jtool *.o x86_64 jtool.x64

backup:
	tar cvf ~/jtool.`date +%m%d%y`.tar *.c *.h 2.DO *.1 Makefile WhatsNew.txt

dist: 
	tar cvf jtool.tar Makefile jtool.1 jtool  jtool.ELF* disarm WhatsNew.txt
joker:
	gcc -DJOKER joker.c machlib.c  disass.c arm64.c thumb16.c arm32.c companion.c disass_common.c common.c jtoolsyms.c objc.c decorate.c jtoolFuncs.c -o joker -g2 -DHAVE_LZSS

jokerlinux:
	gcc -DJOKER joker.c machlib.c  disass.c arm64.c thumb16.c arm32.c companion.c disass_common.c common.c jtoolsyms.c objc.c decorate.c jtoolFuncs.c -o joker.ELF64 -g2  -I./include -DLINUX
	
jokerarm64:
	gcc-arm64 -DJOKER joker.c machlib.c  disass.c thumb16.c arm64.c arm32.c companion.c disass_common.c common.c jtoolsyms.c objc.c decorate.c jtoolFuncs.c -o joker.arm64 
	jtool --sign --inplace --ent plat.ent joker.arm64

jokerarm:
	gcc-armv7 -DJOKER joker.c machlib.c  disass.c arm64.c arm32.c companion.c disass_common.c common.c jtoolsyms.c objc.c decorate.c jtoolFuncs.c -o joker.armv7
	jtool --sign --inplace joker.armv7

jokeruni: jokerarm64 joker
	lipo -create -arch x86_64 joker  -arch arm64 joker.arm64 -output joker.universal
	
jokerdist: jokeruni
	tar cvf joker.tar joker.universal joker.ELF64

jokerdebug:
	gcc -g2 joker.c machlib.c  disass.c arm64.c thumb16.c arm32.c companion.c disass_common.c common.c jtoolsyms.c objc.c decorate.c jtoolFuncs.c -o joker 
	


