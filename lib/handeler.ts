import { welcomeTemplate } from "./welcome";
import * as handlebars from "handlebars";
export function compileWelcomeTemplate(name: string, url: string) {
  const template = handlebars.compile(welcomeTemplate);
  const htmlBody = template({
    name: name,
    url: url,
  });
  return htmlBody;
}