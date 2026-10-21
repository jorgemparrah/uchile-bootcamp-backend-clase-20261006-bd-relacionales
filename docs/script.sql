
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
  (1,'NodeConf Santiago',   '2026-11-20', 1500,  TRUE, 1),
  (2,'Backend Day',         '2026-12-12', 900,   TRUE, 1),
  (3,'Dev Summit',          '2027-01-15', 600,   FALSE, 2),
  (4,'Legacy Conference',   '2025-08-10', 200,   TRUE, 3),
  (5,'NodeConf Valparaiso', '2026-12-20',  800,  TRUE, 1);

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

CREATE TABLE usuario (
  id VARCHAR(64) PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  clave VARCHAR(100) NOT NULL,
  activo BOOLEAN NOT NULL
);

INSERT INTO usuario (id, nombre, correo, clave, activo) VALUES
('1', 'Juan Perez', 'juan.perez@example.com', 'password123', TRUE),
('2', 'Maria Gonzalez', 'maria.gonzalez@example.com', 'password456', TRUE),
('3', 'Carlos Ramirez', 'carlos.ramirez@example.com', 'password789', FALSE),
('4', 'Ana Torres', 'ana.torres@example.com', 'password321', TRUE),
('5', 'Luis Fernandez', 'luis.fernandez@example.com', 'password654', TRUE),
('6', 'Sofia Martinez', 'sofia.martinez@example.com', 'password987', TRUE),
('7', 'Diego Soto', 'diego.soto@example.com', 'password111', TRUE);

CREATE TABLE actividad (
  id INT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  evento_id INT,

  CONSTRAINT fk_actividad_evento
    FOREIGN KEY (evento_id)
    REFERENCES evento(id)
);

INSERT INTO actividad (id, nombre, evento_id) VALUES
  (1, 'Conferencia Node.js', 1),
  (2, 'Taller Backend', 2),
  (3, 'Charla Dev Summit', 3),
  (4, 'Mesa Redonda Legacy', 4),
  (5, 'Workshop NodeConf Valparaiso', 5),
  (6, 'Panel de Expertos', 1),
  (7, 'Networking Session', 2),
  (8, 'Workshop Avanzado', 3),
  (9, 'Charla Técnica', 4),
  (10, 'Panel de Discusión', 5),
  (11, 'Taller de Innovación', 1),
  (12, 'Charla Motivacional', 2),
  (13, 'Mesa Redonda Técnica', 3),
  (14, 'Workshop Práctico', 4),
  (15, 'Panel de Emprendedores', 5),
  (16, 'Networking Avanzado', 1),
  (17, 'Conferencia Internacional', 2),
  (18, 'Taller de Estrategia', 3),
  (19, 'Charla Inspiradora', 4),
  (20, 'Workshop Colaborativo', 5);

CREATE TABLE inscripcion (
  usuario_id VARCHAR(64),
  actividad_id INT,

  PRIMARY KEY (usuario_id, actividad_id),

  CONSTRAINT fk_inscripcion_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuario(id),

  CONSTRAINT fk_inscripcion_actividad
    FOREIGN KEY (actividad_id)
    REFERENCES actividad(id)
);

INSERT INTO inscripcion (usuario_id, actividad_id) VALUES
  ('1', 1),
  ('1', 2),
  ('2', 3),
  ('2', 4),
  ('3', 5),
  ('4', 7),
  ('4', 8),
  ('5', 10),
  ('6', 11),
  ('1', 13),
  ('2', 14),
  ('5', 17),
  ('6', 18),
  ('2', 20);

CREATE TABLE compra (
  id INT PRIMARY KEY,
  usuario_id VARCHAR(64),
  evento_id INT,
  tipo_entrada_id INT,
  fecha DATE,

  CONSTRAINT fk_compra_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuario(id),

  CONSTRAINT fk_compra_entrada
    FOREIGN KEY (evento_id, tipo_entrada_id)
    REFERENCES entrada(evento_id, tipo_entrada_id)
);

INSERT INTO compra (id, usuario_id, evento_id, tipo_entrada_id, fecha) VALUES
  (1, '1', 1, 1, '2026-10-06'),
  (2, '2', 2, 1, '2026-10-06'),
  (3, '3', 3, 1, '2026-10-07'),
  (4, '4', 1, 2, '2026-10-08'),
  (5, '6', 2, 2, '2026-10-09'),
  (6, '6', 3, 1, '2026-10-10'),
  (7, '6', 1, 1, '2026-10-11');

ALTER TABLE recinto
  ADD COLUMN direccion VARCHAR(300) NOT NULL,
  ADD COLUMN capacidad INT NOT NULL;