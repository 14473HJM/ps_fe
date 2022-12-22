
export const isValidToNext = (project) => {
    console.log(project);
    if(!project.projectStatus) {
        return false;
    } else {
        switch (project.projectStatus) {
            case "CREATED":
                if(project.name && project.description && project.objective &&
                    project.projectLimit && project.scopes.length > 0 && project.projectType &&
                    project.projectTheme && project.tutor) {
                    return true;
                }
                break;
            case "UNDER_PROP_REVIEW":
                if(project.name && project.description && project.objective &&
                    project.projectLimit && project.scopes.length > 0 && project.projectType
                    && project.projectTheme) {
                    return true;
                }
                break;
            case "PROP_ACCEPTED":
                if(project.name && project.description && project.objective &&
                    project.projectLimit && project.scopes.length > 0 && project.projectType
                    && project.projectTheme && project.tutor && project.issueTracker
                    && project.codeRepositories.length > 0
                    && !project.codeRepositories.every(repo => repo.recordStatus === 'deleted')) {
                    return true;
                }
                break;
            case "WIP":
                if(project.name && project.description && project.objective &&
                    project.projectLimit && project.scopes.length > 0 && project.projectType
                    && project.projectTheme && project.tutor && project.issueTracker
                    && project.codeRepositories.length > 0) {
                    return true;
                }
                break;
            case "UNDER_FINAL_REVIEW":
                if(project.name && project.description && project.objective &&
                    project.projectLimit && project.scopes.length > 0 && project.projectType
                    && project.projectTheme && project.tutor && project.issueTracker
                    && project.codeRepositories.length > 0) {
                    return true;
                }
                break;
            case "READY_TO_DELIVER":
                if(project.name && project.description && project.objective &&
                    project.projectLimit && project.scopes.length > 0 && project.projectType
                    && project.projectTheme  && project.tutor&& project.issueTracker &&
                    project.codeRepositories.length > 0) {
                    return true;
                }
                break;
            case "DELIVERED":
                if(project.name && project.description && project.objective &&
                    project.projectLimit && project.scopes.length > 0 && project.projectType
                    && project.projectTheme  && project.tutor&& project.issueTracker &&
                    project.codeRepositories.length > 0 && project.projectPresentation) {
                    return true;
                }
                break;
            case "FINISHED":
                if(project.name && project.description && project.objective &&
                    project.projectLimit && project.scopes.length > 0 && project.projectType
                    && project.projectTheme  && project.tutor&& project.issueTracker &&
                    project.codeRepositories.length > 0 && project.projectPresentation &&
                    project.valuations.length == 3) {
                    return true;
                }
                break;
            case "CANCELED":
                return true;
                break;
            default:
                return false;
                break;
        }
    }
};

export const messageValidation = (project) => {
    console.log(project);
    let message = {
        title: "Faltan completar campos",
        description: "Por favor complete los siguientes campos para avanzar: ",
        fields: [],
        alert: !isValidToNext(project)
    };
    if(!project.projectStatus) {
        message.alert = false;
        return message;
    } else {
        switch (project.projectStatus) {
            case "CREATED":
                createdMessageValidation(project,message);
                return message;
                break;
            case "UNDER_PROP_REVIEW":
                createdMessageValidation(project,message);
                return message;
                break;
            case "PROP_ACCEPTED":
                createdMessageValidation(project,message);
                if(!project.issueTracker) {
                    message.fields.push('Seguimiento del proyecto');
                }
                if (!project.codeRepositories.length > 0 || project.codeRepositories.every(repo => repo.recordStatus === 'deleted')) {
                    message.fields.push('Repositorios de código');
                }
                return message;
                break;
            case "WIP":
                createdMessageValidation(project,message);
                if(!project.issueTracker) {
                    message.fields.push('Seguimiento del proyecto');
                }
                if(!project.codeRepositories.length > 0) {
                    message.fields.push('Repositorios de código');
                }
                return message;
                break;
            case "UNDER_FINAL_REVIEW":
                createdMessageValidation(project,message);
                if(!project.issueTracker) {
                    message.fields.push('Seguimiento del proyecto');
                }
                if(!project.codeRepositories.length > 0) {
                    message.fields.push('Repositorios de código');
                }
                return message;
                break;
            case "READY_TO_DELIVER":
                createdMessageValidation(project,message);
                if(!project.issueTracker) {
                    message.fields.push('Seguimiento del proyecto');
                }
                if(!project.codeRepositories.length > 0) {
                    message.fields.push('Repositorios de código');
                }
                if(!project.projectPresentation) {
                    message.fields.push('Archivos finales');
                }
                return message;
                break;
            case "DELIVERED":
                createdMessageValidation(project,message);
                if(!project.issueTracker) {
                    message.fields.push('Seguimiento del proyecto');
                }
                if(!project.codeRepositories.length > 0) {
                    message.fields.push('Repositorios de código');
                }
                if(!project.projectPresentation) {
                    message.fields.push('Archivos finales');
                }
                return message;
                break;
            case "FINISHED":
                createdMessageValidation(project,message);
                if(!project.issueTracker) {
                    message.fields.push('Seguimiento del proyecto');
                }
                if(!project.codeRepositories.length > 0) {
                    message.fields.push('Repositorios de código');
                }
                if(!project.projectPresentation) {
                    message.fields.push('Archivos finales');
                }
                if(!project.valuations.length === 3) {
                    message.fields.push('Evaluación');
                }
                return message;
                break;
            case "CANCELED":
                return true;
                break;
            default:
                return false;
                break;
        }
    }
}

const createdMessageValidation = (project, message) => {
    if(!project.name) {
        message.fields.push('Nombre del proyecto');
    }
    if(!project.description) {
        message.fields.push('Descripción del proyecto');
    }
    if(!project.objective){
        message.fields.push('Objetivo del Sistema de Información');
    }
    if(!project.projectLimit) {
        message.fields.push('Limite del Sistema de Información');
    }
    if(!project.scopes.length > 0) {
        message.fields.push('Alcance del Sistema de Información');
    }
    if(!project.projectType) {
        message.fields.push('Tipo de proyecto');
    }
    if(!project.projectTheme) {
        message.fields.push('Tema del proyecto');
    }
    if(!project.tutor) {
        message.fields.push('Tutor');
    }
    if(message.fields.length > 0) {
        message.alert = true;
    }
}