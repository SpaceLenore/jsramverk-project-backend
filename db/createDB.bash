#!/bin/bash

echo "> Create test database"

if [ -n $1 ]; then
    cd db
    $(> $1.sqlite)
    cat data.sql | sqlite3 $1.sqlite
    cd ..
fi
