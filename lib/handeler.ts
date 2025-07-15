import { welcomeTemplate } from "./welcome";
import { meTemplate } from "./me";
import * as handlebars from "handlebars";
export function compileWelcomeTemplate(name: string, url: string) {
  const template = handlebars.compile(welcomeTemplate);
  const htmlBody = template({
    name: name,
    url: url,
  });
  return htmlBody;
}
export function compileMeTemplate(email: string) {
  const template = handlebars.compile(meTemplate);
  const htmlBody = template({
    email: email,
  });
  return htmlBody;
}