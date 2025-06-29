SELECT 
    tc.table_name AS tabla_origen,
    kcu.column_name AS columna_origen,
    ccu.table_name AS tabla_referenciada,
    ccu.column_name AS columna_referenciada
FROM 
    information_schema.table_constraints AS tc
    JOIN information_schema.key_column_usage AS kcu 
      ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage AS ccu 
      ON ccu.constraint_name = tc.constraint_name
WHERE constraint_type = 'FOREIGN KEY';
