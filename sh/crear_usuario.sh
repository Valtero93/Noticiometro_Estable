#!/bin/bash
DB="noticiometro"
USER="user"
PASS="1234"

sudo mysql -u root -prootpassword -e "CREATE USER '$USER'@'localhost' IDENTIFIED BY '$PASS'";
sudo mysql -u root -prootpassword -e "GRANT SELECT, INSERT, UPDATE ON $DB.* TO '$USER'@'localhost'";