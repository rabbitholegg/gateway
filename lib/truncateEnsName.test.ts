import { truncateEnsName } from './truncateEnsName';

// original specs: https://linear.app/rh-app/issue/DEV-2663/add-creator-column-to-quest-list
describe('truncateEnsName', () => {
  it('should return input if empty string', () => {
    expect(truncateEnsName('')).toEqual('');
    expect(truncateEnsName('  ')).toEqual('  ');
  });

  it('should not truncate if < maxLength', () => {
    expect(truncateEnsName('rabbithole.eth')).toEqual('rabbithole.eth');
  });

  it('should take a maxLength param', () => {
    expect(truncateEnsName('rabbitholetoolong.eth', { maxLength: 20 })).toEqual(
      'rabbit...oolong.eth',
    );
  });

  it('should take a chunkSize param', () => {
    expect(truncateEnsName('rabbitholetoolong.eth', { chunkSize: 2 })).toEqual(
      'ra...ng.eth',
    );
  });

  it('should force chunkSize param to be >= 1', () => {
    expect(truncateEnsName('rabbitholetoolong.eth', { chunkSize: 0 })).toEqual(
      'r...g.eth',
    );
  });

  it('chungus size chunkSizes just return the original string', () => {
    expect(truncateEnsName('rabbitholetoolong.eth', { chunkSize: 60 })).toEqual(
      'rabbitholetoolong.eth',
    );
  });

  it('should take a delimiter param', () => {
    expect(
      truncateEnsName('rabbitholetoolong.eth', { delimiter: '-' }),
    ).toEqual('rabbit-oolong.eth');
  });

  it('should ignore overly long delimiters', () => {
    expect(
      truncateEnsName('rabbithole.eth', {
        delimiter:
          'why am i writing tests for these insane edge cases who is going to do stuff like this??',
      }),
    ).toEqual('rabbithole.eth');
  });

  it('the input name length is equal to maxLength or more (including .eth ending as 4 characters) we should truncate to show first 6 characters, then… and ending 6 (2 + .eth)', () => {
    expect(truncateEnsName('sapphiresunshine123.eth')).toEqual(
      'sapphi...ine123.eth',
    );

    expect(truncateEnsName('extraterrestrial1.eth')).toEqual(
      'extrat...trial1.eth',
    );

    expect(
      truncateEnsName('verylongnamehelloworldhowareyou.eth', {
        maxLength: 10,
        delimiter: '@',
        chunkSize: 1,
      }),
    ).toEqual('v@u.eth');
  });

  it('should factor in chunkSize and the length of the delimiter in order to not create a string that ends up being longer than the maximumLength', () => {
    expect(
      truncateEnsName(
        'onetwothree.eth', // 15 characters
        {
          delimiter: '...', // 4 characters
          chunkSize: 3, // 6 characters (2 chunks * 3)
          maxLength: 10,
        },
      ),
    ).toEqual('one...ree.eth'); // 10 character string, thats ok!

    expect(
      truncateEnsName(
        'onetwothree.eth', // 15 characters
        {
          delimiter: '......', // 6 characters
          chunkSize: 3, // 6 characters (2 chunks * 3)
          maxLength: 10,
        },
      ),

      // This is longer than 10 characters but if we truncate it based on these parameters  we end up with a string
      // that is longer than the original string. In this case we just return the original string.
      // "one......ree.eth" = 16 characters!
    ).toEqual('onetwothree.eth');
  });

  it('should work with subdomains', () => {
    expect(
      truncateEnsName('rabbit.hole.how.many.subdomains.can.there.be.eth', {
        maxLength: 15,
      }),
    ).toEqual('rabbit...ere.be.eth');
  });
});
