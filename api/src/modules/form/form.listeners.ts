import { Injectable } from "@nestjs/common";

import { FormService } from "./form.service";
import { FormName } from "./form.constants";

@Injectable()
export class FormListeners {
    public name = FormName
    constructor(private itemService: FormService) {
    }

}