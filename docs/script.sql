
/*
CREAMOS PRIMERO LAS ENTIDADES QUE NO DEPENDEN DE OTRAS
SON LAS QUE EN EL DIAGRAMA TIENEN SOLAMENTE EL LADO DE LA RELACION "UNO"
ESTAS TABLAS PUEDEN SER CREADAS ANTES QUE LAS DEMÁS PORQUE NO TIENEN CLAVES FORANEAS
*/

CREATE TABLE recinto (
  id INT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

INSERT INTO recinto (id, nombre) VALUES
(1, 'Recinto Principal'),
(2, 'Recinto Secundario'),
(3, 'Recinto Terciario');


CREATE TABLE tipo_entrada (
  id INT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

INSERT INTO tipo_entrada (id, nombre) VALUES
(1, 'General'),
(2, 'VIP'),
(3, 'Premium');

/*
CUANDO CREAMOS TABLAS QUE DEPENDEN DE OTRAS
ESTAS TABLAS TIENEN CLAVES FORANEAS QUE REFERENCIAN A OTRAS TABLAS
PODEMOS SEGUIR LA MISMA LOGICA QUE ANTES PERO ASEGURANDOSE QUE
LAS TABLAS QUE DEPENDEN DE OTRAS SEAN CREADAS DESPUES DE LAS TABLAS A LAS QUE REFERENCIAN
*/

-- LA TABLA EVENTOS NECESITA REFERENCIAR A RECINTOS (YA ESTA CREADA ARRIBA)
CREATE TABLE evento (
  id INT PRIMARY KEY,
  nombre varchar(100) NOT NULL,
  fecha date NOT NULL,
  capacidad INT DEFAULT NULL,
  activo BOOLEAN NOT NULL,
  recinto_id INT,
  CONSTRAINT fk_eventos_recinto
    FOREIGN KEY (recinto_id)
    REFERENCES recinto(id)
);

INSERT INTO evento (id,nombre,fecha,capacidad,activo,recinto_id) VALUES
  (1,'NodeConf Santiago',   '2026-11-20', 1500,  1, 1),
  (2,'Backend Day',         '2026-12-12', 900,   1, 1),
  (3,'Dev Summit',          '2027-01-15', 600,   0, 2),
  (4,'Legacy Conference',   '2025-08-10', 200,   1, 3),
  (5,'NodeConf Valparaiso', '2026-12-20',  800,  1, 1);

-- LA TABLA ENTRADA NECESITA REFERENCIAR A EVENTOS Y TIPO_ENTRADA (YA ESTAN CREADAS ARRIBA)
CREATE TABLE entrada (
  evento_id INT,
  tipo_entrada_id INT,
  precio INT,

  PRIMARY KEY (evento_id, tipo_entrada_id),
  CONSTRAINT fk_entrada_evento
    FOREIGN KEY (evento_id)
    REFERENCES evento(id),

  CONSTRAINT fk_entrada_tipo_entrada
    FOREIGN KEY (tipo_entrada_id)
    REFERENCES tipo_entrada(id)
);

INSERT INTO entrada (evento_id, tipo_entrada_id, precio) VALUES
(1, 1, 100),
(1, 2, 200),
(1, 3, 300),
(2, 1, 2000),
(2, 2, 5000),
(2, 3, 8000),
(3, 1, 8000),
(3, 2, 15000),
(3, 3, 20000);
