import { Card, CardContent } from "@prisma/client";
export type CardWithContent = Card & { contents: CardContent[] };
export type ContentWithCard = CardContent & { card: Card };
