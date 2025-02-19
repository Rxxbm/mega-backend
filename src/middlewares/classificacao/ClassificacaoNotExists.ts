import { Response, Request, NextFunction } from "express";
import { classificacaoRepository } from "../../repositories/Classificacao";
import { RouteResponse } from "../../common/http-responses";

export const ClassificacaoNotExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const classificacao = await classificacaoRepository.findOne({
    where: { id },
  });

  if (!classificacao) {
    return RouteResponse.notFound(res, "Classificacao não encontrado");
  }

  next();
};
