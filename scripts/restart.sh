#!/bin/bash
# stop and start the service

servicename="healthbot"


if systemctl --all --type service | grep -q "$servicename";then
    npx prisma migrate deploy
    npx prisma generate
    service $servicename stop
    systemctl daemon-reload
    service $servicename start
else
    echo "$servicename does not exist."
fi

