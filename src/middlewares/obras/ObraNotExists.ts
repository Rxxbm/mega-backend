import { Request, Response, NextFunction } from "express";
import { obrasRepository } from "../../repositories/Obras";
import { RouteResponse } from "../../common/http-responses";

export const ObraNotExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const obra = await obrasRepository.findOneBy({ id });
  if (!obra) {
    return RouteResponse.notFound(res, "Obra não encontrada");
  }
  next();
};
