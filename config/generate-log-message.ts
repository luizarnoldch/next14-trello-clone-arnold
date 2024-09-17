import { ACTION, ENTITY } from "@prisma/client";

export const generateLogMessage = ({
  action,
  entityTitle,
  entity,
}: {
  action: ACTION;
  entityTitle: string;
  entity: ENTITY;
}) => {
  const actionMessages = {
    [ACTION.CREATE]: `${entityTitle} is created : (${entity.toLocaleLowerCase()})`,
    [ACTION.DELETE]: `${entityTitle} is deleted : (${entity.toLocaleLowerCase()})`,
    [ACTION.UPDATE]: `${entityTitle} is updated : (${entity.toLocaleLowerCase()})`,
  };

  return actionMessages[action] || "Undefined Action";
};
