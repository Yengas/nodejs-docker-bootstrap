FROM mariadb:10.1

# Link backup folder to a speacial folder in the container
# Mariadb entrypoint checks this folder and imports sql files if they weren't import before.
# This gives us the flexibility of running `docker-compose down -v` to return to a specific database state.
ADD ./backup /docker-entrypoint-initdb.d

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["mysqld"]