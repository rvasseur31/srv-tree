import fs from "fs";
import path from "path";
import handlebars from "handlebars";

export const getMailOptions = (to: string[], subject: string, payload: any, template: string) => {
    const htmlMail = getMailTemplate(template);
    return {
        from: '"Admin" <admin@tree.com>',
        to: convertArrayToString(to),
        subject: subject,
        html: htmlMail(payload),
    };
};

const getMailTemplate = (template: string): HandlebarsTemplateDelegate<any> => {
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    return handlebars.compile(source);
};

const convertArrayToString = (mails: string[]): string => {
    let output = "";
    mails.forEach((mail) => {
        output += `${mail}, `;
    });
    return output;
};
