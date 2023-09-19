import { selectorsFromBytecode } from '../index';

//const address = "0xbadc0defafcf6d4239bdf0b66da4d7bd36fcf05a";
//const missingSelector = "0x69277b67";


//const address = "0x00000000006c3852cbEf3e08E8dF289169EdE581";
//const extraSelector = "0x06fdde03";

//const address = "0x388c818ca8b9251b393131c08a736a67ccb19297"
//const missingSelectorJump = "0x8980f11f";

test('code with deploy init', () => {
  // https://github.com/shazow/whatsabi/issues/19#issuecomment-1498767496 
  const code = "60806040526000805534801561001457600080fd5b50610178806100246000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806329e46078146100675780634e148ce11461009a57806368e5c066146100cd578063a87d942c146100e4575b600080fd5b34801561007357600080fd5b50610098600480360381019080803563ffffffff16906020019092919050505061010f565b005b3480156100a657600080fd5b506100cb600480360381019080803563ffffffff169060200190929190505050610122565b005b3480156100d957600080fd5b506100e2610135565b005b3480156100f057600080fd5b506100f9610143565b6040518082815260200191505060405180910390f35b8060020263ffffffff1660008190555050565b8060010263ffffffff1660008190555050565b600160005401600081905550565b600080549050905600a165627a7a72305820946aaa67044121e8026c839756e8dc0bcd00731a5c7239ace3524046974de6720029";

  const r = selectorsFromBytecode(code);
  r.sort();

  expect(r).toEqual(["0x29e46078", "0x4e148ce1", "0x68e5c066", "0xa87d942c"]);
})

test('code with non payable guard before router', () => {
  // https://github.com/shazow/whatsabi/issues/19#issuecomment-1500383369
  const code = "608060405234801561001057600080fd5b506004361061004c5760003560e01c806329e46078146100515780634e148ce11461008557806368e5c066146100b9578063a87d942c146100c3575b600080fd5b6100836004803603602081101561006757600080fd5b81019080803563ffffffff1690602001909291905050506100e1565b005b6100b76004803603602081101561009b57600080fd5b81019080803563ffffffff1690602001909291905050506100f4565b005b6100c1610107565b005b6100cb610115565b6040518082815260200191505060405180910390f35b8060020263ffffffff1660008190555050565b8060010263ffffffff1660008190555050565b600160005401600081905550565b6000805490509056fea26469706673582212204c69a9d6b5cb7799cdc0b4ac099047de21c79769b6be631679204f0e5bd74a0c64736f6c63430006000033";
  const r = selectorsFromBytecode(code);
  r.sort();

  expect(r).toEqual(["0x29e46078", "0x4e148ce1", "0x68e5c066", "0xa87d942c"]);
})

test('code with immutable in solidity', () => {
  // Via https://twitter.com/RenanRSouza35/status/1644308118375915523
  /*
    contract Foo {
        uint public immutable a;

        constructor(uint _a) {
            a = _a;
        }
    }
  */
  const code = "60a060405234801561001057600080fd5b506040516101913803806101918339818101604052810190610032919061007b565b8060808181525050506100a8565b600080fd5b6000819050919050565b61005881610045565b811461006357600080fd5b50565b6000815190506100758161004f565b92915050565b60006020828403121561009157610090610040565b5b600061009f84828501610066565b91505092915050565b60805160d16100c060003960006049015260d16000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80630dbe671f14602d575b600080fd5b60336047565b604051603e91906082565b60405180910390f35b7f000000000000000000000000000000000000000000000000000000000000000081565b6000819050919050565b607c81606b565b82525050565b6000602082019050609560008301846075565b9291505056fea2646970667358fe1220fefe877c7ce1496f641a93e2d422be3341a5980ffe704ad09a703dbf0bb1656d64736f6c63430008110033";
  const r = selectorsFromBytecode(code);
  r.sort();

  expect(r).toEqual([
    "0x0dbe671f" // a()
  ]);
})

test('issue 42', () => {
  // https://github.com/shazow/whatsabi/issues/42
  // https://etherscan.io/address/0x37c6e59e1ae39d81828db1a8e8233d6b2afcb9a8
  const bytecode = "0x5b602960346000f073032be5d2772329c11a72dadb32ce03806bb26f0a3160005760006000600060003031335af15060006000f36000600060206000600073032be5d2772329c11a72dadb32ce03806bb26f0a5a6069600052f15033ff";
  const r = selectorsFromBytecode(bytecode);
  expect(r).toEqual([
  ]);
});
