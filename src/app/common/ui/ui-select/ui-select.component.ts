import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WithDataTestId } from '@common/models';

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ui-select.component.html',
  styleUrl: './ui-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSelectComponent implements WithDataTestId {
  dataTestId = input<string>('ui-select');

  options = input<string[]>([]);
  label = input<string>('Select an option');
  selectedOption = input<string | null>('');
  changeOption = output<string>();

  onChangeOption(option: string) {
    this.changeOption.emit(option);
  }
}
