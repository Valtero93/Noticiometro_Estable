#!/bin/bash
DB="noticiometro"
USER="user"
PASS="1234"

sudo mysql -u root -prootpassword -e "CREATE DATABASE $DB CHARACTER SET utf8 COLLATE utf8_general_ci";