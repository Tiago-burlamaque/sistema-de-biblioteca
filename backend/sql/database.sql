CREATE SCHEMA sistema_biblioteca;

USE sistema_biblioteca;

SELECT * FROM usuario;

SELECT * FROM livro;

CREATE TABLE usuario(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(225) NOT NULL,
    email VARCHAR(225) UNIQUE NOT NULL,
    senha CHAR(64) NOT NULL, 
    ativo INT NOT NULL DEFAULT 1
);

CREATE TABLE livro(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(225) NOT NULL UNIQUE,
    autor VARCHAR(225) NOT NULL,
    genero VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    disponivel ENUM("Disponivel", "Não disponivel") NOT NULL,
    ativo INT NOT NULL DEFAULT 1
);
