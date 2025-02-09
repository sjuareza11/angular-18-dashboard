import { ChangeDetectionStrategy, Component, input, InputSignal, model, ModelSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInputComponent {
  readonly label: InputSignal<string> = input<string>('');
  readonly placeholder: InputSignal<string> = input<string>('Search...');
  readonly inputValue: ModelSignal<string> = model.required<string>();
}
