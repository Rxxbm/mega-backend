import swaggerJsDoc from "swagger-jsdoc";
import { Cliente } from "../entities/Cliente";
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
        url: `http://localhost:${process.env.port || 3000}`,
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
      },
    },
  },
  apis: ["./src/controllers/*.ts"], // Caminho para os arquivos onde a documentação será gerada
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;
