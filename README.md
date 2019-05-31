# DatabaseSystem
SQL, Mongodb and JDBC

## Development Diary

# SQL
## SQL*Plus & SQL Syntax(Using Oracle)
- Use command below to execute an external sql file:

```sql
@[path+filename]
```

- Put a ';' at the end of a line or use command below to execute  command of multiple lines: 

```sql
COMMIT;
```


- List all the tables of the current user:

```sql
SELECT table_name FROM user_tables
```

- Delete all the tables of the current user: Execute the following command and spool the result of this query and execute it:

```sql
select 'drop table '||table_name||' cascade constraints;' from user_tables;
```

- Run the last command you saw:

```sql
/
```
