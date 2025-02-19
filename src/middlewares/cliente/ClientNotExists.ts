import { Response, Request, NextFunction } from "express";
import { clienteRepository } from "../../repositories/Cliente";
import { RouteResponse } from "../../common/http-responses";

export const ClientNotExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const cliente = await clienteRepository.findOne({
    where: { id },
  });
  if (!cliente) {
    return RouteResponse.notFound(res, "Cliente não encontrado");
  }
  next();
};
