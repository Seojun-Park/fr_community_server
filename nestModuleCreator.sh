#!/bin/bash

echo -e "\t\t\n\n \033[1;33mNest Module Creator\033[0m"
echo -e "\033[1;32mEnter the title\033[0m"
read title

nest g mo $title
nest g s $title
nest g resolver $title

echo -e "\033[1;31mDone!\033[0m"
