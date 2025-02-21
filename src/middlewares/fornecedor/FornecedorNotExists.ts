import { Request, Response, NextFunction } from "express";
import { FornecedorRepository } from "../../repositories/Fornecedor";
import { RouteResponse } from "../../common/http-responses";

export const FornecedorNotExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const fornecedor = await FornecedorRepository.findOneBy({ id });
  if (!fornecedor) {
    return RouteResponse.notFound(res, "Fornecedor não encontrado");
  }
  next();
};
