// const database  = require('../models')

const Services = require('../Services/Services.js')
const niveisServices = new Services('Niveis')

class NivelController {
    static async pegaTodosNiveis(req, res) {
        try {
            const todosOsNiveis = await niveisServices.pegaTodoOsRegistros()
            return res.status(200).json(todosOsNiveis)
         } catch (error) {
            return res.status(500).json(error.message)
        }
    }

   static async pegaUmNivel(req, res) {
        const { id } =  req.params
        try {
            const umNivel = await database.Niveis.findOne( { where: { id: Number(id) } } )
            return res.status(200).json(umNivel)
        } catch (error){
            return res.status(500).json(error.message)
        }
   }

   static async criaNivel(req, res) {
        const novoNivel = req.body
        try {
            const novoNivelCriado = await database.Niveis.create(novoNivel)
            return res.status(200).json(novoNivelCriado)
        } catch(error) {
            return res.status(500).json(error.message)
        }
   }

   // atualizar um Registro
   static async atualizaNivel(req, res) {
        const { id } = req.params
        const novosNiveis = req.body
        try {
            await database.Niveis.update(novasInfos, { where: { id: Number(id) } })
            // retornar se deu certo ou não
            const nivelAtualizado =  await database.Niveis.findOne( { where: { id: Number(id) } } )
            return res.status(200).json(nivelAtualizado)
        } catch (error){
            return res.status(500).json(error.message)
        }
   }

   // deletar um Registro
    static async apagaNivel(req, res) {
        const { id } = req.params
        try {
            await database.Niveis.destroy( { where: { id: Number(id) } } )
            return res.status(200).json( { mensagem: `id ${id} deletado` } )
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}

module.exports = NivelController