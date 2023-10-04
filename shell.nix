{ pkgs ? import <nixpkgs> {} # here we import the nixpkgs package set   
}:                                                                      
pkgs.mkShell {               # mkShell is a helper function             
  	name="dev-environment";    # that requires a name                     
    buildInputs = [            # and a list of packages                   
    	pkgs.nodePackages_latest.typescript
     ];                                                                    
     shellHook = ''             # bash to run when you enter the shell     
        echo "Typescript Start Developing...";tsc --version;
     '';                                                                   
 }