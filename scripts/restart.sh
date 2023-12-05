# /bin/bash
# stop and start the service

servicename="healthbot"

if systemctl --all --type service | grep -q "$servicename";then
    service $servicename stop
else
    echo "$servicename does not exist."
fi

