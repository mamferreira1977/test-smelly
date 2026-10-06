const { UserService } = require ('../src/userService');

const dadosUsuarioPadrao = {
  nome: 'Fulano de Tal',
  email: 'fulano@teste.com',
  idade: 25,
};

describe('UserService - Suíte de Testes Limpos', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    userService._clearDB();
  });

  test('deve criar um usuário corretamente', () => {
    // Arrange
    const {nome, email, idade} = dadosUsuarioPadrao;

    // Act
    const usuarioCriado = userService.createUser(nome, email, idade);

    // Assert
    expect(usuarioCriado.id).toBeDefined();
    expect(usuarioCriado.nome).toBe(nome);
    expect(usuarioCriado.status).toBe('ativo');
  });

  test('deve buscar um usuário existente pelo id', () => {
    // Arrange
    const usuarioCriado = userService.createUser(
        dadosUsuarioPadrao.nome,
        dadosUsuarioPadrao.email,
        dadosUsuarioPadrao.idade
    );

    // Act
    const usuarioBuscado = userService.getUserById(usuarioCriado.id);

    // Assert
    expect(usuarioBuscado.nome).toBe(dadosUsuarioPadrao.nome);
    expect(usuarioBuscado.status).toBe('ativo');
  });

  test('deve desativar um usuário comum', () => {
    // Arrange
    const usuarioComum = userService.createUser(
        'Comum',
        'comum@teste.com',
        30
    );

    // Act
    const resultado = userService.deactivateUser(usuarioComum.id);
    const usuarioAtualizado = userService.getUserById(usuarioComum.id);

    // Assert
    expect(resultado).toBe(true);
    expect(usuarioAtualizado.status).toBe('inativo');
  });

  test('não deve desativar um usuário administrador', () => {
    // Arrange
    const usuarioAdmin = userService.createUser(
        'Admin',
        'admin@teste.com',
        40,
        true
    );

    // Act
    const resultado = userService.deactivateUser(usuarioAdmin.id);

    // Assert
    expect(resultado).toBe(false);
  });

  test('deve gerar relatório contendo os usuários cadastrados', () => {
    // Arrange
    userService.createUser('Alice', 'alice@email.com', 28);
    userService.createUser('Bob', 'bob@email.com', 32);

    // Act
    const relatorio = userService.generateUserReport();

    // Assert
    expect(relatorio).toContain('Alice');
    expect(relatorio).toContain('Bob');
    expect(relatorio).toContain('ativo');
  });

  test('deve lançar erro ao criar usuário menor de idade', () => {
    // Arrange
    const nome = 'Menor';
    const email = 'menor@email.com';
    const idade = 17;

    // Act
    const criarUsuarioMenor = () => {
      userService.createUser(nome, email, idade);
    };

    // Assert
    expect(criarUsuarioMenor).toThrow(
        'O usuário deve ser maior de idade.'
    );
  });

  test('deve informar quando não há usuários cadastrados', () => {
    // Arrange
    // O banco já está vazio devido ao beforeEach.

    // Act
    const relatorio = userService.generateUserReport();

    // Assert
    expect(relatorio).toContain('Nenhum usuário cadastrado.');
  });
});