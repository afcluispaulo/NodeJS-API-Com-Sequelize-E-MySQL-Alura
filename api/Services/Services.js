const database = require('../models')

class Services { 
    constructor(nomeDoModelo) {
        this.nomeDoModelo = nomeDoModelo
    }

    async pegaTodoOsRegistros() {
        return database[this.nomeDoModelo].findAll()
    }

    async pegaUmRegistro(where = {}) {
        return database[this.nomeDoModelo].findOne({ where: { ...where }})
    }

    async criaRegistro(dados) {
        return database[this.nomeDoModelo].create(dados)
    }

    async apagaRegistro(id) {
        return database[this.nomeDoModelo]
            .destroy(dadosAtualizados, { where: { id: id  } })
    }

    async restauraRegistro(id) {
        return database[this.nomeDoModelo].restore({ where: { id: id } })
    }

    async atualizaRegistro(dadosAtualizados, id, transacao = {}) {
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, { where: { id: id } }, transacao)
    }

    async atualizaRegistros(dadosAtualizados, where, transacao = {}) {
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, { where: { ...where } }, transacao)
    }

    async encontraEContaRegistros(where = {}, agregradores) {
        return database[this.nomeDoModelo]
        .findAndContAll({where: {...where}, ...agregradores})
    }
    
}

module.exports = Services