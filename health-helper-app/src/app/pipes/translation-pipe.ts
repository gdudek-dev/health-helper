import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation/translation-service';

@Pipe({
    name: 'translate'
})
export class TranslationPipe implements PipeTransform {

    constructor(private translateService: TranslationService){}

    transform(value: string): string | undefined {
        return this.translateService.getTranslation(value);
    }
}