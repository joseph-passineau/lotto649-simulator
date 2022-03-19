import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, DialogContentText } from '@mui/material';
import React from 'react';
import { FixedLengthArray } from 'types';
import { PickNumberInput } from './PickNumberInput';

export interface PickTicketDialogProps {
    open: boolean
    onClose: () => void;
    save: (numbers: FixedLengthArray<[number, number, number, number, number, number]>) => void;
}

export const PickTicketDialog: React.FC<PickTicketDialogProps> = (props: PickTicketDialogProps) => {
  const [numbers, setNumbers] = React.useState<number[]>([]);

  const handleNumberClick = (value: number) => {
    if (numbers.includes(value)) {
      const newNumbers = [...numbers];
      newNumbers.splice(numbers.indexOf(value), 1);
      setNumbers(newNumbers);
    } else {
      setNumbers([...numbers, value]);
    }
  };

  const handleOnClose = () => {
    props.onClose();
    setNumbers([]);
  };

  const handleOnSave = () => {
    props.save([numbers[0], numbers[1], numbers[2], numbers[3], numbers[4], numbers[5]]);
    handleOnClose();
  };

  const allPossibleNumbers = Array.from({ length: 49 }, (_, i) => i + 1);
  const canSave = numbers.length === 6;

  return (
        <Dialog open={props.open} onClose={handleOnClose}>
            <DialogTitle>Pick your numbers</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {canSave
                      ? (
                        <>You have picked 6 numbers.</>
                        )
                      : (
                        <>Pick {6 - numbers.length} more numbers.</>
                        )}
                </DialogContentText>
                <Stack direction="row" flexWrap="wrap" gap={2} mt={2}>
                    {allPossibleNumbers.map((number) => (
                        <PickNumberInput key={number} value={number} isSelected={numbers.includes(number)} onClick={handleNumberClick} isClickable={!canSave || numbers.includes(number)}/>
                    ))}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOnClose} color="error">Cancel</Button>
                <Button onClick={handleOnSave} disabled={!canSave}>Confirm</Button>
            </DialogActions>
        </Dialog>
  );
};
