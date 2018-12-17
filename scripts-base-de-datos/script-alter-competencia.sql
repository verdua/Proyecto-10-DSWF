
USE competencias;

ALTER TABLE competencia ADD 
(
    `genero_id` INT(11) UNSIGNED DEFAULT NULL,
    `director_id` INT(11) UNSIGNED DEFAULT NULL,
    `actor_id` INT(11) UNSIGNED DEFAULT NULL,
    CONSTRAINT `fk_genero` FOREIGN KEY (`genero_id`) REFERENCES genero(`id`),
    CONSTRAINT `fk_director` FOREIGN KEY (`director_id`) REFERENCES director(`id`),
    CONSTRAINT `fk_actor` FOREIGN KEY (`actor_id`) REFERENCES actor(`id`)
);