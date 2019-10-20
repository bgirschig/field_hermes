cd "$(dirname "$0")"
cd "../"

npm run build
rsync --progress --archive --human-readable dist/ u68883171@home415082389.1and1-data.host:~/projects/field_hermes/