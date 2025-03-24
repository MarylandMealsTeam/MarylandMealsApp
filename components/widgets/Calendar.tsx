import { useState } from "react";
import { Popover, PopoverArrow, PopoverBackdrop, PopoverBody, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import DateTimePicker, { useDefaultClassNames } from "react-native-ui-datepicker";
import { Center } from "../ui/center";
import { Heading } from "../ui/heading";
import { ChevronDownIcon, Icon } from "../ui/icon";
import { HStack } from "../ui/hstack";
import { Text } from "../ui/text";

const CalendarPopup = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const defaultClassNames = useDefaultClassNames();
  return (
    <Popover
      isOpen={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      placement={props.placement}
      size="full"
      trigger={(triggerProps) => {
        return (
          <Button
            size="md"
            variant="link"
            className="rounded-md"
            {...triggerProps}
          >
            {props.children}
            {/* <ButtonIcon as={CalendarClock} /> */}
          </Button>
        );
      }}
    >
      <PopoverBackdrop className="bg-black" />
      <PopoverContent>
        <PopoverArrow />
        <Center className="">
          <PopoverBody className="">
            <DateTimePicker
              mode="single"
              date={props.date}
              maxDate={Date.now()}
              navigationPosition="around"
              showOutsideDays
              onChange={(params) =>
                props.setDate(new Date(params.date as Date))
              }
              classNames={{
                ...defaultClassNames,
                day_cell:`${defaultClassNames.day_cell} w-2 aspect-square m-auto`,
                today: 'border-primary-500',
                selected: 'bg-primary-500 border-primary-500',
                selected_label: "text-white",
                button_prev: "text-primary-500",
                button_next: "text-primary-500",
                day: `${defaultClassNames.day} hover:bg-primary-100`,
                disabled: 'opacity-50',
                selected_month: 'text-primary-500',
                selected_month_label: 'text-primary-500 rounded-xl',
                selected_year_label: 'text-primary-500 rounded-xl',
                button_next_image: 'text-primary-500'
              }}
            />
          </PopoverBody>
        </Center>
      </PopoverContent>
    </Popover>
  );
};

export default function Calendar(props: any) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    weekday: undefined,
  };

  return (
    <CalendarPopup {...props}>
      {props.size === "sm" ?
        <Text size="md" className="text-primary-500">
          {props.date.toLocaleDateString("en-us", options)}
        </Text> :
        <HStack space="sm" className="items-center">
          <Heading size="3xl" className="text-primary-500">
            {props.date.toLocaleDateString("en-us", options)}
          </Heading>
          <Icon as={ChevronDownIcon} className="text-primary-500 aspect-square w-8"></Icon>
        </HStack>
      }
    </CalendarPopup>
  );
}