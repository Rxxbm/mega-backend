import swaggerJsDoc from "swagger-jsdoc";
import { Cliente } from "../entities/Cliente";
import { Classificacao } from "../entities/Classificacao";
import { Nota } from "../entities/Nota";
import { Obras } from "../entities/Obras";
import { Produto } from "../entities/Produto";
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
              type: "date",
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
              type: "text",
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
              type: "int",
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
              type: "text",
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
              type: "date",
              description: "Data de início do aluguel",
            },
            data_devolucao: {
              type: "date",
              description: "Data de devolução do aluguel",
            },
            subtotal: {
              type: "decimal",
              description: "Subtotal do aluguel",
            },
            observacao: {
              type: "text",
              description: "Observação do aluguel",
            },
            preco_unitario: {
              type: "decimal",
              description: "Preço unitário do aluguel",
            },
          },
        },
        Nota: {
          type: "object",
          properties: {
            cliente: {
              type: "Cliente ID",
              description: "Cliente da nota",
            },
            obra: {
              type: "Obra ID",
              description: "Obra da nota",
            },
            data_movimentacao: {
              type: "date",
              description: "Data da movimentação",
            },
            observacao: {
              type: "text",
              description: "Observação da nota",
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
              type: "int",
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
            quantidade: {
              type: "int",
              description: "Quantidade do produto",
            },
            categoria: {
              type: "Classificacao ID",
              description: "Categoria do produto",
            },
            preco: {
              type: "decimal",
              description: "Preço do produto",
            },
            estoque: {
              type: "int",
              description: "Estoque do produto",
            },
            unidade: {
              type: "string",
              description: "Unidade do produto",
            },
            idenizacao: {
              type: "decimal",
              description: "Indenização do produto",
            },
            nota: {
              type: "Nota ID",
              description: "Nota do produto",
            },
          },
        },
      },
    },
  },
  apis: ["./dist/controllers/*.js"], // Caminho para os arquivos onde a documentação será gerada
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
