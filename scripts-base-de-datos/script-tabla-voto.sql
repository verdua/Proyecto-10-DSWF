/*Script para crear la tabla donde se guardarán los votos 
  de una pelicula asociada a una competencia*/

CREATE TABLE IF NOT EXISTS voto 
(
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `competencia_id` INT(11) UNSIGNED NOT NULL,
    `pelicula_id` INT(11) UNSIGNED NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`pelicula_id`) REFERENCES pelicula(`id`),
    FOREIGN KEY(`competencia_id`) REFERENCES competencia(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;