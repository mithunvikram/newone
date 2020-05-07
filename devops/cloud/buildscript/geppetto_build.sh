#!bin/bash

APPLICATION='/newone'

CUSTOMSERVICEPATH='../../../services/custom_services'

HELMPATH='../devops/cloud'

DESKTOPCODE='../../../application/client/desktop/newone'
DESKTOPIMAGENAME='geppettotest/newone-desktop:1.0'

echo "Started to build docker images for pod...."


build_appbuilder_image () {

cd $DESKTOPCODE
npm install
npm rebuild node-sass
npm uninstall @angular-devkit/build-angular
npm install @angular-devkit/build-angular
# if directory is exist
[ -d "$(pwd)/dist" ] && rm -rf dist
ng build
docker build -t $DESKTOPIMAGENAME .
if [ $? -eq 0 ]; then
    docker push $DESKTOPIMAGENAME
    echo "$DESKTOPIMAGENAME is successfully pushed"
else
    echo "Image $DESKTOPIMAGENAME-desktop:1.0 build failed"
fi

}


build_microservices(){

cd $CUSTOMSERVICEPATH

for d in * ; do
    
    echo "building : $d"
    cd $d
    if [ $? -eq 0 ]; then
        docker build -t geppettotest$APPLICATION-$d:1.0 .
        if [ $? -eq 0 ]; then
            echo "geppettotest$APPLICATION-$d:1.0 build succesfully"
            docker push geppettotest$APPLICATION-$d:1.0 
            sleep 2
            cd ..
        else
            echo "geppettotest$APPLICATION-$d:1.0 build failed"
        fi        
    else
        echo "$d is not a folder!"
    fi
      
      done

}


clean_images(){

docker rmi -f $DESKTOPIMAGENAME

for d in * ; do
    docker rmi -f geppettotest$APPLICATION-$d:1.0
    if [ $? -eq 0 ]; then
        echo "geppettotest$APPLICATION-$d:1.0 deleted"
        cd ..
    else
        echo "error in deleting geppettotest$APPLICATION-$d:1.0"
    fi
done

}

helm_install () {

cd $HELMPATH
helm install --dry-run --debug ./helm
helm install --name newone ./helm
if [ $? -eq 0 ]; then
    echo "App Deployment is Done"
    export NODE_PORT=$(kubectl get --namespace newone -o jsonpath="{.spec.ports[0].nodePort}" services newone-system-entry)
    export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[1].address}")
    export LOGGING_PORT=$(kubectl get --namespace newone-logging -o jsonpath="{.spec.ports[0].nodePort}" services kibana)
    echo "------------------------"
    echo "App Url : http://$NODE_IP:$NODE_PORT"
    echo "------------------------"
    echo "Logging Url : http://$NODE_IP:$LOGGING_PORT"
    echo "------------------------"


else
    echo "App deployment is Failed, there is a problem with helm charts"
fi

}



build_appbuilder_image
build_microservices
clean_images
helm_install
