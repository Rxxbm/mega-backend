import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api de gerenciamento da MEGA",
      version: "1.0.0",
      description: "Documentação da API",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Servidor de desenvolvimento",
      },
      {
        url: "https://mega-backend-35me.onrender.com/",
        description: "Servidor de produção",
      },
    ],
    components: {
      schemas: {
        Fornecedor: {
          type: "object",
          properties: {
            razao_social: {
              type: "string",
              description: "Razão social do fornecedor",
            },
            data: {
              type: "string",
              description: "Data de cadastro do fornecedor",
            },
            nome_fantasia: {
              type: "string",
              description: "Nome fantasia do fornecedor",
            },
            cpf_cnpj: {
              type: "string",
              description: "CPF ou CNPJ do fornecedor",
            },
            endereco: {
              type: "string",
              description: "Endereço",
            },
            bairro: {
              type: "string",
              description: "Bairro",
            },
            uf: {
              type: "string",
              description: "UF",
            },
            cidade: {
              type: "string",
              description: "Cidade",
            },
            cep: {
              type: "string",
              description: "CEP",
            },
            telefone: {
              type: "string",
              description: "Telefone",
            },
            telefone_fax: {
              type: "string",
              description: "Telefone/Fax",
            },
            email: {
              type: "string",
              description: "Email",
            },
            observacoes: {
              type: "string",
              description: "Observações",
            },

            // Adicione outras propriedades do Fornecedor aqui
          },
        },
        Cliente: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Nome do cliente",
            },
            fantasy_name: {
              type: "string",
              description: "Nome do cliente",
            },
            cnpj_cpf: {
              type: "string",
              description: "CPF ou CNPJ do cliente",
            },
            phone: {
              type: "string",
              description: "Telefone",
            },
            cellphone: {
              type: "string",
              description: "Celular",
            },
            client_state: {
              type: "string",
              description: "Estado",
            },
            address: {
              type: "string",
              description: "Endereço",
            },
            address_number: {
              type: "integer",
              description: "Número do endereço",
            },
            address_cep: {
              type: "string",
              description: "CEP",
            },
            address_uf: {
              type: "string",
              description: "UF",
            },
            address_city: {
              type: "string",
              description: "Cidade",
            },
            person_type: {
              type: "string",
              description: "Tipo de pessoa",
            },
            address_neighborhood: {
              type: "string",
              description: "Bairro",
            },
            address_complement: {
              type: "string",
              description: "Complemento do endereço",
            },
            contact: {
              type: "string",
              description: "Contato",
            },
            // Adicione outras propriedades do Cliente aqui
          },
        },
        Classificacao: {
          type: "object",
          properties: {
            nome: {
              type: "string",
              description: "Nome da classificação",
            },
            descricao: {
              type: "string",
              description: "Descrição da classificação",
            },
          },
        },
        Aluguel: {
          type: "object",
          properties: {
            nome: {
              type: "string",
              description: "Nome do aluguel",
            },
            cliente: {
              type: "Cliente ID",
              description: "Cliente do aluguel",
            },
            obra: {
              type: "Obra ID",
              description: "Obra do aluguel",
            },
            data_inicio: {
              type: "string",
              description: "Data de início do aluguel",
            },
            data_devolucao: {
              type: "string",
              description: "Data de devolução do aluguel",
            },
            subtotal: {
              type: "number",
              description: "Subtotal do aluguel",
            },
            observacao: {
              type: "string",
              description: "Observação do aluguel",
            },
            produtos: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  preco_unitario: {
                    type: "number",
                    description: "Preço do Produto do aluguel",
                  },
                  quantidade: {
                    type: "integer",
                    description: "Quantidade do produto",
                  },
                  produto: {
                    type: "string",
                    description: "ID do Produto do aluguel",
                  },
                },
                required: ["preco_unitario", "quantidade", "produto"], // Se todos são obrigatórios
              },
            },
          },
        },
        Nota: {
          type: "object",
          properties: {
            aluguel: {
              type: "string",
              description: "Aluguel da nota",
            },
            data_movimentacao: {
              type: "string",
              description: "Data da movimentação",
            },
            tipo: {
              type: "string",
              description: "Tipo da nota",
            },
            observacao: {
              type: "string",
              description: "Observação da nota",
            },
            produtos_nota: {
              type: "array",
              description: "Lista de produtos da nota",
              items: {
                type: "object", // Indica que os itens são objetos
                properties: {
                  quantidade: {
                    type: "integer",
                    description: "Quantidade do produto",
                  },
                  produto: {
                    type: "string", // ID do Produto
                    description: "ID do Produto da nota",
                  },
                },
                required: ["quantidade", "produto"], // Definindo que ambos são obrigatórios
              },
            },
          },
        },
        Obras: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Nome da obra",
            },
            address: {
              type: "string",
              description: "Endereço da obra",
            },
            address_number: {
              type: "integer",
              description: "Número do endereço da obra",
            },
            address_cep: {
              type: "string",
              description: "CEP do endereço da obra",
            },
            address_uf: {
              type: "string",
              description: "UF do endereço da obra",
            },
            address_city: {
              type: "string",
              description: "Cidade do endereço da obra",
            },
            address_neighborhood: {
              type: "string",
              description: "Bairro do endereço da obra",
            },
            address_complement: {
              type: "string",
              description: "Complemento do endereço da obra",
            },
          },
        },
        Produto: {
          type: "object",
          properties: {
            nome: {
              type: "string",
              description: "Nome do produto",
            },
            categoria: {
              type: "Classificacao ID",
              description: "Categoria do produto",
            },
            preco: {
              type: "number",
              description: "Preço do produto",
            },
            estoque: {
              type: "integer",
              description: "Estoque do produto",
            },
            unidade: {
              type: "string",
              description: "Unidade do produto",
            },
            indenizacao: {
              type: "number",
              description: "Indenização do produto",
            },
          },
        },
      },
    },
  },
  apis: ["./src/controllers/*.ts", "./src/dist/controllers/*.js"], // Caminho para os arquivos onde a documentação será gerada
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
