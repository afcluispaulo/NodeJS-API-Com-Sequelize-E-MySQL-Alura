const { Router } = require('express')

const PessoaController = require('../controllers/PessoaController.js')
const MatriculaController = require('../controllers/MatriculaController.js')

const router = Router()

// GET
// Rota para mostrar todas as pessoas ativas
router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
// Rota para mostrar todas as pessoas (ativa E inativas)
router.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
// Rota para mostrar uma pessoa pelo seu id
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)
// Rota para mostrar a matrícula de um estudante pelo id
router.get('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.pegaUmaMatricula)
// Rota para mostrar as matriculas do estudante
router.get('/pessoas/:estudanteId/matricula', MatriculaController.pegaMatriculas)
router.get('/pessoas/matricula/:turmaId/confirmadas', MatriculaController.pegaMatriculasPorTurma)
router.get('/pessoas/matricula/lotada', MatriculaController.pegaTurmasLotadas)


// POST
// Rota para criar pessoa
router.post('/pessoas', PessoaController.criaPessoa)
// Rota para criar matricula
router.post('/pessoas/:estudanteId/matricula', MatriculaController.criaMatricula)
// Rota para restaurar uma pessoa que foi "deletada (soft delete)" 
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoas)


// PUT
// Rota para atualizar dados de uma pessoa
router.put('/pessoas/:id', PessoaController.atualizaPessoa)
// Rota para atualizar uma matricula de um estudante
router.put('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.atualizaMatricula)


// DELETE (soft delete)
// Rota para deletar uma pessoa por id (soft delete)
router.delete('/pessoas/:id', PessoaController.apagaPessoa)
// Rota para deletar uma matrícula por id (soft delete)
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', MatriculaController.apagaMatricula)

module.exports = router