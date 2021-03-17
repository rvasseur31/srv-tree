export const getMailOptions = (to: string[], subject: string, message: string) => {
    return {
        from: '"Admin" <admin@tree.com>',
        to: convertArrayToString(to),
        subject: subject,
        text: message, 
    }
}

const convertArrayToString = (mails: string[]) : string => {
    let output = ""
    mails.forEach((mail) => {
        output += `${mail}, `
    });
    return output;
}