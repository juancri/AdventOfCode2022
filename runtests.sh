#!/usr/bin/env bats

@test "01/first" {
  result="$(node dist/01/first)"
  [ "$result" = "$(cat tests/01/first.txt)" ]
}

@test "01/second" {
  result="$(node dist/01/second)"
  [ "$result" = "$(cat tests/01/second.txt)" ]
}

@test "02/first" {
  result="$(node dist/02/first)"
  [ "$result" = "$(cat tests/02/first.txt)" ]
}

@test "02/second" {
  result="$(node dist/02/second)"
  [ "$result" = "$(cat tests/02/second.txt)" ]
}

@test "03/first" {
  result="$(node dist/03/first)"
  [ "$result" = "$(cat tests/03/first.txt)" ]
}

@test "03/second" {
  result="$(node dist/03/second)"
  [ "$result" = "$(cat tests/03/second.txt)" ]
}

@test "04/first" {
  result="$(node dist/04/first)"
  [ "$result" = "$(cat tests/04/first.txt)" ]
}

@test "04/second" {
  result="$(node dist/04/second)"
  [ "$result" = "$(cat tests/04/second.txt)" ]
}

@test "05/first" {
  result="$(node dist/05/first)"
  [ "$result" = "$(cat tests/05/first.txt)" ]
}

@test "05/second" {
  result="$(node dist/05/second)"
  [ "$result" = "$(cat tests/05/second.txt)" ]
}

@test "06/first" {
  result="$(node dist/06/first)"
  [ "$result" = "$(cat tests/06/first.txt)" ]
}

@test "06/second" {
  result="$(node dist/06/second)"
  [ "$result" = "$(cat tests/06/second.txt)" ]
}

@test "07/first" {
  result="$(node dist/07/first)"
  [ "$result" = "$(cat tests/07/first.txt)" ]
}

@test "07/second" {
  result="$(node dist/07/second)"
  [ "$result" = "$(cat tests/07/second.txt)" ]
}

@test "08/first" {
  result="$(node dist/08/first)"
  [ "$result" = "$(cat tests/08/first.txt)" ]
}

@test "08/second" {
  result="$(node dist/08/second)"
  [ "$result" = "$(cat tests/08/second.txt)" ]
}

@test "09/first" {
  result="$(node dist/09/first)"
  [ "$result" = "$(cat tests/09/first.txt)" ]
}

@test "09/second" {
  result="$(node dist/09/second)"
  [ "$result" = "$(cat tests/09/second.txt)" ]
}

@test "10/first" {
  result="$(node dist/10/first)"
  [ "$result" = "$(cat tests/10/first.txt)" ]
}

@test "10/second" {
  result="$(node dist/10/second)"
  [ "$result" = "$(cat tests/10/second.txt)" ]
}

@test "11/first" {
  result="$(node dist/11/first)"
  [ "$result" = "$(cat tests/11/first.txt)" ]
}

@test "11/second" {
  result="$(node dist/11/second)"
  [ "$result" = "$(cat tests/11/second.txt)" ]
}

@test "12/first" {
  result="$(node dist/12/first)"
  [ "$result" = "$(cat tests/12/first.txt)" ]
}

@test "12/second" {
  result="$(node dist/12/second)"
  [ "$result" = "$(cat tests/12/second.txt)" ]
}

@test "13/first" {
  result="$(node dist/13/first)"
  [ "$result" = "$(cat tests/13/first.txt)" ]
}

@test "13/second" {
  result="$(node dist/13/second)"
  [ "$result" = "$(cat tests/13/second.txt)" ]
}

@test "14/first" {
  result="$(node dist/14/first)"
  [ "$result" = "$(cat tests/14/first.txt)" ]
}

@test "14/second" {
  result="$(node dist/14/second)"
  [ "$result" = "$(cat tests/14/second.txt)" ]
}

@test "15/first" {
  result="$(node dist/15/first)"
  [ "$result" = "$(cat tests/15/first.txt)" ]
}

@test "15/second" {
  result="$(node dist/15/second)"
  [ "$result" = "$(cat tests/15/second.txt)" ]
}
