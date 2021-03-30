import fs from "fs";
import path from "path";
import handlebars from "handlebars";

export const getMailOptions = async (to: string[], subject: string, payload: any, template: string) => {
    const htmlMail = await getMailTemplate(template);
    return {
        from: '"Admin" <admin@tree.com>',
        to: convertArrayToString(to),
        subject,
        html: htmlMail(payload),
    };
};

const getMailTemplate = async (template: string): Promise<HandlebarsTemplateDelegate<any>> => {
    const source = await fs.promises.readFile(path.join(__dirname, template), "utf8");
    return handlebars.compile(source);
};

const convertArrayToString = (mails: string[]): string => {
    let output = "";
    mails.forEach((mail) => {
        output += `${mail}, `;
    });
    return output;
};
