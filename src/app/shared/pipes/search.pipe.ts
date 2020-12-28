import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], ...args: string[]): any[] {
    if (!items) {
      return items;
    }

    /**
     * There is and additional check for trimmed search term
     */
    if (!args.length || !args[0] || args[0].trim() === '') {
      return items;
    }

    /**
     * I added trimStart method(alias for this method is trimLeft, they do the same thing)
     * so it's possible to search for wanted event even though the space key is pressed multiple times.
     */
    const filterText: string = args[0].toLowerCase().trimStart();

    return items.filter((it) => {
      let item: any = null;

      /**
       * Filter check (solution for task number 2)
       */
      if (it.name.toLowerCase().includes(filterText)) {
        item = filterText;
      }

      return item;
    });
  }
}
