// Pessoa Controller vai ser uma classe
//const database  = require('../models')
// const Sequelize = require('sequelize')

const { PessoasServices } = require('../Services') // se é index.js nao precisa colocar o arquivo, só o nome da pasta
const pessoasServices = new PessoasServices()

class PessoaController {
    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos()
            return res.status(200).json(pessoasAtivas)
         } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await pessoasServices.pegaTodoOsRegistros()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

   static async pegaUmaPessoa(req, res) {
        const { id } =  req.params
        try {
            const umaPessoa = await pessoasServices.pegaUmRegistro({ id })
            return res.status(200).json(umaPessoa)
        } catch (error){
            return res.status(500).json(error.message)
        }
   }

   static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch(error) {
            return res.status(500).json(error.message)
        }
   }

   // atualizar um Registro
   static async atualizaPessoa(req, res) {
        const { id } = req.params
        const novasInfos = req.body
        try {
            await pessoasServices.atualizaRegistro(novasInfos, Number(id))
            return res.status(200).json({ mensagem: `id ${id} atualizado` })
        } catch (error){
            return res.status(500).json(error.message)
        }
   }

   // deletar um Registro
    static async apagaPessoa(req, res) {
        const { id } = req.params
        try {
            await pessoasServices.apagaRegistro(Number(id))
            return res.status(200).json( { mensagem: `id ${id} deletado` } )
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            const registroRestaurado =  await pessoasServices.restauraRegistro(Number(id))
            return res.status(200).json({registroRestaurado})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    
    /*
        static async pegaUmaMatricula(req, res) {
            const { estudanteId, matriculaId } =  req.params
            try {
                const umaMatricula = await database.Matriculas.findOne( { 
                    where: { 
                        id: Number(matriculaId), 
                        estudante_id: Number(estudanteId) 
                    } 
                })
                return res.status(200).json(umaMatricula)
            } catch (error){
                return res.status(500).json(error.message)
            }
        }
    */

    

    /*
        static async criaMatricula(req, res) {
            const { estudanteId } = req.params
            const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
            try {
                const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
                return res.status(200).json(novaMatriculaCriada)
            } catch(error) {
                return res.status(500).json(error.message)
            }
        }
   */

   /*
   static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId} = req.params
        const novasInfos = req.body
        try {
            await database.Matriculas.update(novasInfos, { 
                where: { 
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                } 
            })
            // retornar se deu certo ou não
            const MatriculaAtualizada =  await database.Matriculas.findOne( { 
                where: { 
                    id: Number(matriculaId) 
                } } )
            return res.status(200).json(MatriculaAtualizada)
        } catch (error){
        return res.status(500).json(error.message)
        }
    }
    *
 
    static async apagaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.destroy( { 
                where: { 
                    id: Number(matriculaId) 
                } } )
            return res.status(200).json( { mensagem: `id ${matriculaId} deletado` } )
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculas(req, res) {
        const { estudanteId } = req.params
        try {
            const pessoa = await database.Pessoas.findOne( { 
                where: { 
                    id: Number(estudanteId)
                } } )
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculasPorTurma(req, res) {
        const { turmaId } = req.params
        // quer checar quantas matrículas tem por id de turma.
        try {
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'ASC']]
            })
            return res.status(200).json(todasAsMatriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTurmasLotadas(req, res) {
        const { turmaId } = req.params
        const lotacaoTurma = 2 
        try {
            const turmasLotadas = await database.Matriculas.findAndCountAll( {
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            } )
            return res.status(200).json(turmasLotadas)    
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    */

    static async cancelaPessoas(req, res) {
        const { estudanteId } = req.params
        try {
            await pessoasServices.cancelaPessoaEMatricula(Number(estudanteId))
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController 